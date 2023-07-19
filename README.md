# quicktemp
JavaScript HTML Templater

This template, along with correctly formatted HTML templates, allows for the reuse of HTML code and quick insertion of values and other templates into defined areas of the template. The end result is HTML text that can be displayed in a browser.

Example:

<html>
    <head>
        <title>{{ title }}</title>
    </head>
    <body>{{ body }}
    </body>
    {{ % footer % }}
</html>

The above template has two variables - title, body - that will be replaced with predefined values in the getTempalteHTML function. It also has the {{ % footer % }} marker which will be replaced with the HTML result of the footer.template file added in the 'template' folder of the project.

This works recursively, so if the footer.template file itself has markers, those will be replaced when it's inserted.
