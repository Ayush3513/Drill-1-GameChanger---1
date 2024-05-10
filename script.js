function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function anime(){
    var tl = gsap.timeline()

tl.from("#nav",{
    y:-30,
    delay:0.5,
    duration:0.8,
    opacity:0,
})

tl.from("#hero h1",{
    y:200,
    duration:1,
    stagger:0.2,
    delay:-0.3,
})
tl.from(".bound h2",{
    y:-40,
    duration:0.3,
    opacity:0,
})
tl.from("#hero h5",{
    y:-80,
    duration:0.6,
    stagger:0.2,
    delay:-1,
})
tl.from("#hero-btm h4",{
    opacity:0,
    duration:0.4,
    y:-10,
})

}
function mouseFlollower(scalex,scaley,rotx){
    window.addEventListener("mousemove",function(dets){
       document.querySelector("#miniCircle").style.transform = `translate(${dets.x}px,${dets.y}px) scale(${scalex},${scaley})`
    })
}
function adateda(){
    var timeout
    var prex = 0;
    var prey = 0;
    
    var scalex = 1;
    var scaley = 1;
    
    document.addEventListener("mousemove",function(dets){
    
    clearTimeout(timeout)
    
        scalex = gsap.utils.clamp(0.8,1.2, dets.x - prex)
        scaley = gsap.utils.clamp(0.8,1.2, dets.y - prey)
    
        prex = dets.x
        prey = dets.y
    
    timeout = setTimeout(() => {
        document.querySelector("#miniCircle").style.transform = `translate(${dets.x}px,${dets.y}px) scale(1,1) `
    }, 100);
    
        mouseFlollower(scalex,scaley)
    })
    
}

anime()
mouseFlollower()
locoScroll()
adateda()


document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0
    var diffrot = 0

    elem.addEventListener("mousemove",function(dets){
        var diff = dets.y - elem.getBoundingClientRect().top;
        diffrot = dets.x - rotate;
        rotate = dets.x;

        gsap.to(elem.querySelector("img"),{
            display:"initial",
            opacity:1,
            ease:Power3,
            top:diff,
            left:dets.x,
            rotate: gsap.utils.clamp(-20,20,diffrot)
        })

    })
    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            display:"none",
            ease:Power4,
            opacity:0,
        })

    })

})