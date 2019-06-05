window.setTimeout(function () {
    document.querySelector("#preloader").classList.add("loaded")
    document.querySelector("#main").classList.add("loaded")
}, 3000)

window.setTimeout(function () {
    var animationRevealer = new TimelineLite();
    animationRevealer.to("#block-1", 1, { width: "100%", ease: Power4.easeInOut })
        .to("#block-1", 1, { width: "0", left: "100%", ease: Power4.easeInOut }, 1)
    animationRevealer.to("#block-2", 1, { width: "100%", ease: Power4.easeInOut}, .2)
        .to("#block-2", 1, { width: "0", left: "100%", ease: Power4.easeInOut }, 1.2)
    animationRevealer.to("#block-3", 1, { width: "100%", ease: Power4.easeInOut }, .4)
        .to("#block-3", 1, { width: "0", left: "100%", ease: Power4.easeInOut }, 1.4)
}, 2000)
