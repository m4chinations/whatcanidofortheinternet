var element = document.getElementById('editor');


/* create the action item editor in #editor */
var editor = new JSONEditor(element, {
    theme : 'bootstrap3',
    startval : actionItemArray, //this is just an array with data [ { heading: 'eg', blurb: ...
    schema : {
        type : 'array', //we are editing an array of objects
        title : 'Action Items', 
        format : 'tabs', //show the editor with tabs
        options : { //disable some editor options that are not used
            disable_array_reorder : true,
            collapsed : true,
        },
        items : {
            type : 'object', //the items in the array are objects 
            title : 'Action Item',
            headerTemplate: "{{self.heading}}", //puts tab heading as the element's heading
            options : { //disable some editor options that are not used
                disable_array_reorder : true,
                disable_collapse : true,
                disable_edit_json : true,
                disable_properties : true,
            },
            properties : { //these are the properties of the objects in the array
                heading : { //heading is a string value
                    type : 'string'
                }, 
                blurb : { //the blurb is also a string, but its bigger, so we give it a textarea format
                    type : 'string',
                    format : 'textarea',
                },
                link : { //the link is an object, so we just repeat the same structure as items : { } found above
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


/* creating another editor for the organizations, very similar to above */
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

/* click handler */
document.getElementById('json').addEventListener('click',function() {
    // Get the value from the editor
    var actionJson = editor.getValue();
    var orgJson = orgEditor.getValue();
    //append them together in one array
    var json = {
        'actionjson' : actionJson,
        'orgjson' : orgJson
    };
    //log it to the console
    console.log(json);
    //and also append it to the body of the document.
    if (document.getElementById('code')) {
        document.getElementById('code').textContent = JSON.stringify(json);
    } else {
        var code = document.createElement('pre');
        code.setAttribute('id', 'code');
        code.textContent = JSON.stringify(json);
        document.getElementById('main').appendChild(code);
    }
});
