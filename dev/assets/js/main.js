var element = document.getElementById('editor');


var editor = new JSONEditor(element, {
    theme : 'bootstrap3',
    startval : actionItemArray,
    schema : {
        type : 'array',
        title : 'Action Items',
        format : 'tabs',
        options : {
            disable_array_reorder : true,
            collapsed : true,
        },
        items : {
            type : 'object',
            title : 'Action Item',
            headerTemplate: "{{self.heading}}",
            options : {
                disable_array_reorder : true,
                disable_collapse : true,
                disable_edit_json : true,
                disable_properties : true,
            },
            properties : {
                heading : {
                    type : 'string'
                }, 
                blurb : {
                    type : 'string',
                    format : 'markdown',
                    options : { 
                        expand_height : true
                    }
                },
                link : {
                    type : 'object',
                    properties : {
                        url : {
                            type : 'string',
                            format : 'url'
                        },
                        title : {
                            type : 'string'
                        },
                    },
                },
            }
        }

    }
});

var orgElement = document.getElementById('orgeditor');
var orgEditor = new JSONEditor(orgElement, {
    theme : 'bootstrap3',
    startval : organizationArray,
    schema : {
        type : 'array',
        title : 'Organizations',
        format : 'tabs',
        options : {
            collapsed : true
        },
        items : {
            type : 'object',
            title : 'Organization',
            options : {
                disable_array_reorder : true,
                disable_collapse : true,
                disable_edit_json : true,
                disable_properties : true,
            },
            headerTemplate: "{{self.name}}",
            properties : {
                name : { 
                    type : 'string'
                },
                url : {
                    type : 'string',
                    format : 'url'
                },
                logo : {
                    type : 'string',
                    format : 'url'
                }
            }
        }
    }
});

document.getElementById('json').addEventListener('click',function() {
    // Get the value from the editor
    var actionJson = editor.getValue();
    var orgJson = orgEditor.getValue();
    var json = {
        'actionjson' : actionJson,
        'orgjson' : orgJson
    };
    console.log(json);
    if (document.getElementById('code')) {
        document.getElementById('code').textContent = JSON.stringify(json);
    } else {
        var code = document.createElement('pre');
        code.setAttribute('id', 'code');
        code.textContent = JSON.stringify(json);
        document.getElementById('main').appendChild(code);
    }
});


JSONEditor.plugins.epiceditor = {
    basePath : './assets/epic',
    useNativeFullScreen : false,
    parser : marked,
    autogrow : true,
    button : {
        fullscreen : false
    },
    theme : {
        editor : '/themes/editor/epic-light.css',
    }
};
