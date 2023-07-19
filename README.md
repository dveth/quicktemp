# quicktemp
## JavaScript HTML Templater

This module, along with correctly formatted HTML templates, allows for the reuse of HTML code and quick insertion of values and other templates into predefined areas of the template. The end result is HTML text that can be displayed in a browser.

## Example

Consider the following template:

```
<html>
    <head>
        <title>{{ title }}</title>
    </head>
    <body>{{ body }}
    </body>
    {{ % footer % }}
</html>
```

The above template has two variable markers - 'title' and 'body' - that will be replaced with predefined values in the execution of the getTemplateHTML function. It also contains the {{ % footer % }} marker, which will be replaced with the HTML result of the 'footer.template' file added in the 'templates' folder of your project.

## Recursive Templates

This process works recursively. In the above example, if the 'footer.template' file itself has markers, those will be replaced when it's inserted.

## How to use

1. Include a 'templates' folder in the root directory of your project (or in the same directory as the file that calls 'quicktemp')
2. In the 'templates' folder, create properly formatted '.template' files
3. Import the 'getTemplateHTML' function from this module into your project
4. Call the 'getTemplateHTML' function. The parameters of this function is the path of the main template file and an object containing key-value pairs for the variables to be replaced along with their replacement values
5. The result of the 'getTemplateHTML' function will be a string containing full HTML which can be sent as a REST response

## Security

Make sure to use caution when sending filepaths. This module should only grab '.template' files from the 'templates' folder, but the initial function call which access whichever file is sent to it. Always validate and sanitize any input.
