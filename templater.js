const fs = require('fs').promises

function removeDuplicates(templateMatches){
    let uniqueTemplateMatches = [...new Set(templateMatches)];
    return uniqueTemplateMatches;
}

function getTemplateSubStrings(templateText){
    const regex = /{{ .* }}/g;
    let matches = templateText.match(regex) || [];
    matches = removeDuplicates(matches);
    //console.log("Matches: " + matches);
    return matches;
}

function isNestedTemplate(substring){
    const regex = /% \S* %/g;
    let doesMatch = regex.test(substring);
    return doesMatch;
}

async function replaceText(templateText, substrings, templateData){
    let result = templateText;
    for(const marker of substrings){
        let inner = marker.substring(2,marker.length-2).trim();
        if(!isNestedTemplate(marker)){
            //console.log(inner + ": " + templateData.hasOwnProperty(inner));
            if(templateData.hasOwnProperty(inner)){
                result = result.replaceAll(marker, templateData[inner]);
            }
        }else{
           let innerTemplate = inner.substring(2,inner.length-2).trim();
           try{
            const innerTemplateFilepath = 'templates/' + innerTemplate + '.template';
            let templateHTML = await getTemplateHTML(innerTemplateFilepath);
            result = result.replaceAll(marker, templateHTML);
           }catch (error){
            console.error('Error while retrieving inner template ' + innerTemplateFilepath + ": " + error);
           }
        }
    };
    return result;
}

async function getTemplateHTML (filepath, templateData = {}){
    //console.log(filepath);

    let templateText = await fs.readFile(filepath);
    templateText = templateText.toString();
    const substrings = getTemplateSubStrings(templateText);
    templateText = await replaceText(templateText, substrings, templateData);
    return (templateText);
}

exports.getTemplateHTML = getTemplateHTML;