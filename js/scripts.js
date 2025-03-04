// Change Variable
let stylemode = document.cookie;

// Change Variable
let stylelink = document.getElementById('style');

// Conditional Branch with Else Branch
if (stylemode == 'dark') {
    // Change the href property of the 'link'
    stylelink.href = 'css/dark.css';
} else {
    stylelink.href = 'css/light.css';
    stylemode = 'light';
    document.cookie = 'light';
}

// Common Event
function switchmode() {
    // Conditional Statement with Else Branch
    if (stylemode == 'dark') {
        document.cookie = 'light';
        stylemode = 'light';
        stylelink.href = 'css/light.css';
    } else {
        document.cookie = 'dark';
        stylemode = 'dark';
        stylelink.href = 'css/dark.css';
    }
}

function showhide() {
    let toolbarbuttons = document.getElementById('buttons');
    if (toolbarbuttons.style.display == 'block') {
        toolbarbuttons.style.display = 'none';
    } else {
        toolbarbuttons.style.display = 'block'
    }
}