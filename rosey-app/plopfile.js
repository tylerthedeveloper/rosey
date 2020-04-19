module.exports = function (plop) {
    // create your generators here
    plop.setGenerator('screen', {
        description: 'this is a skeleton screen',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'screen name'
        }],
        actions: [{
            type: 'add',
            path: 'src/screens/{{properCase name}}Screen.js',
            templateFile: 'plop-templates/screen.js'
        }]
    });

    plop.setGenerator('component', {
        description: 'this is a skeleton component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name'
        }],
        actions: [{
            type: 'add',
            path: 'src/components/{{name}}.js',
            templateFile: 'plop-templates/component.js'
        }]
    });
};