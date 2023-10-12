// Select the node that will be observed for mutations
const targetNode = document.querySelector('.skin-vector');

if (targetNode) {
    // Options for the observer (which mutations to observe)
    const config = { childList: true };

    // Define the initial button scale
    let currentScale = 1.0;
    let currentRotation = 0;

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                if (mutation.addedNodes.length == 0) {
                    return
                }
                
                if (mutation.addedNodes[0].getAttribute('class').match('mwe-popups') != null) {
                    console.log("Found the popup");
                    // Found Popup
                    var button = mutation.addedNodes[0].querySelector('.popups-icon');
                    // Change the button's background color
                    // Usage
                    
                    var duration = 1000/10; // Duration of the animation in milliseconds
                    var step = 2; // The step by which the rotation will change in each interval
                    
                    button.addEventListener('mouseover', () => {
                        var targetRotation = 90; // Target rotation in degrees
                        var targetScale = 1.5; // Target scale (enlarged size)
                        var interval = duration / (targetRotation / step);

                        var animationInterval = setInterval(() => {
                            if (currentRotation < targetRotation) {
                                currentRotation += step;
                            }

                            if (currentScale < targetScale) {
                                currentScale += 0.01; // Adjust the step for the desired scale change speed
                            }

                            button.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;

                            if (currentRotation >= targetRotation && currentScale >= targetScale) {
                                //clearInterval(animationInterval);
                            }
                        }, interval);
                    });

                    button.addEventListener('mouseout', () => {
                        var targetRotation = 0; // Target rotation in degrees
                        var targetScale = 1.0; // Target scale (original size)
                        var interval = duration / (currentRotation / step);

                        var animationInterval = setInterval(() => {
                            if (currentRotation > targetRotation) {
                                currentRotation -= step;
                            }
                            if (currentScale > targetScale) {
                                currentScale -= 0.01; // Adjust the step for the desired scale change speed
                            }

                            button.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;

                            if (currentRotation <= targetRotation && currentScale <= targetScale) {
                                clearInterval(animationInterval);
                            }
                        }, interval);
                    });
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}
