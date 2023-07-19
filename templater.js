const fs = require('fs').promises

function removeDuplicates(arr){
    let uniqueArr = [...new Set(arr)];
    return uniqueArr;
}

function getTemplateSubStrings(templateText){
    const regex = /{{ .* }}/g;
    let matches = templateText.match(regex);
    matches = removeDuplicates(matches);
    console.log("Matches: " + matches);
    return matches;
}

function isTemplateOccurrence(substring){
    const regex = /% \S* %/g;
    let doesMatch = regex.test(substring);
    return doesMatch;
}

async function replaceText(templateText, substrings, arr){
    let result = templateText;
    for(const marker of substrings){
        let inner = marker.substring(2,marker.length-2).trim();
        if(!isTemplateOccurrence(marker)){
            //console.log(inner + ": " + arr.hasOwnProperty(inner));
            if(arr.hasOwnProperty(inner)){
                result = result.replaceAll(marker, arr[inner]);
            }
        }else{
           let innerTemplate = inner.substring(2,inner.length-2).trim();
            let templateHTML = await getTemplateHTML('templates/' + innerTemplate + '.template');
            result = result.replaceAll(marker, templateHTML);
        }
    };
    return result;
}

async function getTemplateHTML (filepath, arr = {}){
    console.log(filepath);

    let templateText = await fs.readFile(filepath);
    templateText = templateText.toString();
    let substrings = getTemplateSubStrings(templateText);
    templateText = await replaceText(templateText, substrings, arr);
    return (templateText);
}

exports.getTemplateHTML = getTemplateHTML;