window.hideCustomizer = 0
window.darkmode = 0
function cssVar(name, value) {
    var r = document.querySelector(':root')
    var rs = getComputedStyle(r)
    // console.log(value)
    if (name[0] != '-') name = '--' + name //allow passing with or without --
    if (value) r.style.setProperty(name, value)
    return rs.getPropertyValue(name);
}







setTimeout(runonload, 400)

function runonload() {

    var themeSliders = document.getElementsByClassName("themeslider")
    for (i = 0; i < themeSliders.length; i++) {
        var slider = themeSliders[i]
        slider.addEventListener("input", (e) => {
            if (e.target.id == "fontSize")
                cssVar(`--${e.target.id}`, e.target.value * 16 + "px")
            else cssVar(`--${e.target.id}`, e.target.value)
            document.getElementById(`${e.target.id}Disp`).innerHTML = e.target.value
        })
    }


    var themeSliders = document.getElementsByClassName("themeslider")
    for (i = 0; i < themeSliders.length; i++) {
        var slider = themeSliders[i]
        document.getElementById(`${themeSliders[i].id}Disp`).value = cssVar(`--${themeSliders[i].id}`)
    }

    if (window.DEBUG == 1 || window.DEBUG == true) showCustomizer()

}

if (sessionStorage.getItem("colorConfig") != null) {
    var savedConfig = JSON.parse(sessionStorage.getItem("colorConfig"))
    loadColorConfig(savedConfig)
}


function saveTheme() {
    var selectedFont = document.getElementById("FontSelect").value
    cssVar("--font-body", selectedFont)

    var colorConfig = [
        cssVar("--hue"),
        cssVar("--hueAscent"),
        cssVar("--fontSize"),
        cssVar("--font-body")
        // document.getElementById("FontSelect").value
    ]
    sessionStorage.removeItem("colorConfig")
    sessionStorage.setItem("colorConfig", JSON.stringify(colorConfig))
}

async function loadColorConfig(inputConfig) {
    if (inputConfig == null) inputConfig = await JSON.parse(sessionStorage.getItem("colorConfig"))
    cssVar("--hue", inputConfig[0])
    cssVar("--hueAscent", inputConfig[1])
    cssVar("--fontSize", inputConfig[2])
    cssVar("--font-body", inputConfig[3])
    document.getElementById("FontSelect").value = inputConfig[3]
    changeBodyFont()
    closecustomizer()
}


function changeBodyFont() {
    var fontselecteled = document.getElementById("FontSelect").value
    cssVar("--font-body", `"${fontselecteled}"`)
    document.body.style.fontFamily = fontselecteled
    var all_headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6")
    for (i = 0; i < all_headings.length; i++) {
        cssVar("--font-body", `"${fontselecteled}"; `)
        all_headings[i].style.fontFamily = fontselecteled
    }
}

function toggleCustomizer() {
    if (window.hideCustomizer == 1) {
        showCustomizer()
    }
    else if (window.hideCustomizer == 0) {
        closecustomizer()
    }
}


function closecustomizer() {
    document.getElementById("customizer").style.display = "none"
    document.getElementById("app").style.gridTemplateAreas = '"app app"'
    window.hideCustomizer = 1
    saveTheme()

}

function showCustomizer() {
    document.getElementById("customizer").style.display = "inline-grid";
    document.getElementById("app").style.gridTemplateAreas = '"sidebar app"'
    // document.getElementById("customizer").classList.add("hidden");
    window.hideCustomizer = 0
}


function resetFunction() {
    cssVar("--light", cssVar("--lightDefault"))
    cssVar("--sat", cssVar("--satDefault"))
    cssVar("--hue", cssVar("--hueDefault"))
    localStorage.clear()
    sessionStorage.clear()
    reloadAll()
    loadColorConfig()
}


function toggleDarkMode() {
    // darkmode = document.getElementById("darkmodeswitch")
    // console.log("e.target")
    // var state = darkmode.checked

    console.log("toggleDM" + window.darkmode)
    if (window.darkmode == 0) { darkMode() }
    else if (window.darkmode == 1) { darkModeDisable() }

}
function darkMode() {
    cssVar("--light", "5%")
    cssVar("--sat", "85%")
    cssVar("--darkmode", "dark")
    // localStorage.removeItem("darkmode")
    localStorage.setItem("darkmode", 1)
    window.darkmode = 1
}

function darkModeDisable() {
    cssVar("--light", cssVar("--lightDefault"))
    cssVar("--sat", cssVar("--satDefault"))
    cssVar("--darkmode", "light")
    // localStorage.removeItem("darkmode")
    localStorage.setItem("darkmode", 0)
    window.darkmode = 0
}


const copyright = `< div id = "copyright" >
<span id="copyurl">Designed with
    <a href="https://generatorjs.mgeek.in">GeneratorJs</a>
    &copy; 2022
    <a href="http://mgeek.in" class="none">mGeek.in</a>
    <a href="http://mnnit.ac.in.in">MNNIT</a>
</span>
<span id="copyauthor">Designed by
    <a href="http://webmaster.mgeek.in/">Dr. Prateek Raj Gautam</a>
</span>
</div > `

// if (localStorage.getItem("darkmode") === "true") {
//     document.getElementById("darkmodeswitch").checked = true
//     darkMode()
// }

// var darkmode = 0
// window.darkmode = darkmode



