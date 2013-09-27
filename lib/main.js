const data = require("sdk/self").data;
const tabs = require("sdk/tabs");

exports.main = function(options) {

	console.log(pp(options));

    var btn = require("toolbarbutton").ToolbarButton({
        id: 'my-toolbar-button',
        label: 'Add skull!',
        image: data.url('favicon.png'),
        onCommand: function() {
            if (typeof(tabs.activeTab._worker) == 'undefined') {
                let worker = tabs.activeTab.attach({
                    contentScript: 'self.port.on("sayhello", function() { alert("Hello world!"); })'
                });
                tabs.activeTab._worker = worker;
            }
            tabs.activeTab._worker.port.emit("sayhello");
        }
    });
    
    if (options.loadReason === "install") {
        btn.moveTo({
        toolbarID: "nav-bar",
            forceMove: false // only move from palette
        });
    }
};