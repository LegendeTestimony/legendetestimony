//projects reveal

const projects = document.querySelector(".projects");
const preview = document.querySelector(".preview");
const previewImg = document.querySelector(".preview-img");
let isInside = false;
const bgPositions = {
  p1: "0 0",
  p2: "0 25%",
  p3: "0 50%",
  p4: "0 75%",
  p5: "0 100%",
};


const moveStuff = (e) => {
  const mouseInside = isMouseInsideContainer(e);

  if (mouseInside !== isInside) {
    isInside = mouseInside;
    
    gsap.to(preview, { scale: isInside ? 1 : 0, duration: 0.3, ease: "power2.out" });
  }
};

const moveProject = (e) => {
  const previewRect = preview.getBoundingClientRect();
  const offsetX = previewRect.width / 2;
  const offsetY = previewRect.height / 2;
  preview.style.left = e.pageX - offsetX + "px";
  preview.style.top = e.pageY - offsetY + "px";
};

const moveProjectImg = (project) => {
  const projectId = project.id;
  gsap.to(previewImg, 0.4, {
    backgroundPosition: bgPositions[projectId] || "0 0",
  });
};

const isMouseInsideContainer = (e) => {
  const containerRect = projects.getBoundingClientRect();
  return (
    e.pageX >= containerRect.left &&
    e.pageX <= containerRect.right &&
    e.pageY >= containerRect.top &&
    e.pageY <= containerRect.bottom
  );
};

window.addEventListener("mousemove", moveStuff);

// Start from index 1 to exclude the first project
Array.from(projects.children).slice(1).forEach((project) => {
  project.addEventListener("mousemove", moveProject);
  project.addEventListener("mousemove", moveProjectImg.bind(null, project));
});



// Your existing HoverAware class
class HoverAware {
  static init(els) {
    return new HoverAware(els);
  }

  constructor(els) {
    this.buttons = document.getElementsByClassName(els);

    for (let i = this.buttons.length - 1; i >= 0; i--) {
      this._loadEvents(this.buttons[i]);
    }
  }

  _loadEvents(el) {
    el.addEventListener('mouseenter', (event) => {
      const direction = this._getDir(event, el);
      this._animateLayer(event, el, direction);
    });
    el.addEventListener('mouseleave', (event) => {
      const direction = this._getDir(event, el);
      this._animateLayer(event, el, direction);
    });
  }

  _animateLayer(event, el, direction) {
    const hoverLayer = el.querySelector('.btn__hover-layer');
    const speed = 0.3;

    function tween(topVal, rightVal) {
      if (event.type === 'mouseenter') {
        TweenLite.fromTo(
          hoverLayer,
          speed,
          { top: topVal, right: rightVal },
          { top: 0, right: 0 }
        );
      } else {
        TweenLite.to(
          hoverLayer,
          speed,
          { top: topVal, right: rightVal }
        );
      }
    }

    switch (direction) {
      case 0:
        tween('-100%', 0);
        break;
      case 1:
        tween(0, '-100%');
        break;
      case 2:
        tween('100%', 0);
        break;
      case 3:
        tween(0, '100%');
        break;
    }
  }

  _getDir(event, el) {
    const coordinates = { x: event.pageX, y: event.pageY };
    const w = el.clientWidth;
    const h = el.clientHeight;

    const newX = (coordinates.x - el.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
    const newY = (coordinates.y - el.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);

    let direction = Math.round((((Math.atan2(newY, newX) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    return direction;
  }
}

// Initialize HoverAware for your button
HoverAware.init('c-button');

var defaultStrength = 20;
var reducedStrength = 10; // Adjust the reduced strength value
var defaultThresholdDistance = 150;
var reducedThresholdDistance = defaultThresholdDistance / 20; // Half the threshold for "read-more" elements

document.addEventListener('mousemove', moveMagnet);

function moveMagnet(event) {
  var magnets = document.querySelectorAll('.magnetic');

  magnets.forEach((magnet) => {
    var bounding = magnet.getBoundingClientRect();
    var isReadMore = magnet.classList.contains('read-more');
    
    // Set the default strength and threshold distance
    var strength = isReadMore ? reducedStrength : defaultStrength;
    var thresholdDistance = isReadMore ? reducedThresholdDistance : defaultThresholdDistance;

    // Calculate the distance between the cursor and the center of the magnet
    var distance = Math.hypot(
      event.clientX - (bounding.left + bounding.width / 2),
      event.clientY - (bounding.top + bounding.height / 2)
    );

    // Apply the magnetic effect only if the cursor is within the threshold distance
    if (distance < thresholdDistance) {
      TweenMax.to(magnet, 1, {
        x: (((event.clientX - bounding.left) / magnet.offsetWidth) - 0.5) * strength,
        y: (((event.clientY - bounding.top) / magnet.offsetHeight) - 0.5) * strength * 0.2, // Adjust the multiplier (e.g., 0.5) to reduce the effect
        ease: Power4.easeOut
      });
    } else {
      // Reset the position if the cursor is outside the threshold distance
      TweenMax.to(magnet, 1, { x: 0, y: 0, ease: Power4.easeOut });
    }
  });
}
