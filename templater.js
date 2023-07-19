const fs = require('fs').promises

function removeDuplicates(arr){
    let uniqueArr = [...new Set(arr)];
    return uniqueArr;
}

function getSubStrings(templateText){
    const regex = /{{ \S* }}/g;
    let matches = templateText.match(regex);
    matches = removeDuplicates(matches);
    console.log("Matches: " + matches);
    return matches;
}

function replaceText(templateText, substrings, arr){
    let result = templateText;
    substrings.forEach(element => {
        let inner = element.substring(2,element.length-2).trim();
        console.log(inner + ": " + arr.hasOwnProperty(inner));
        if(arr.hasOwnProperty(inner)){
            result = result.replaceAll(element, arr[inner]);
        }
    });
    return result;
}

exports.getTemplateHTML = async function (filepath, arr = {}){
    console.log(filepath);

    let templateText = await fs.readFile(filepath);
    templateText = templateText.toString();
    let substrings = getSubStrings(templateText);
    templateText = replaceText(templateText, substrings, arr);
    return (templateText);
}