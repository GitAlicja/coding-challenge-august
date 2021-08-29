class MyTracker {
    /**
     * Tracks a single click event
     * @param track_id id of the element that was clicked on
     */
    static track(track_id: number): void {
        // example implementation
        console.log("Event was tracked for" + track_id);
    }
}

interface TrackingData {
    name: string;
    selector: string;
    id: number;
}

class ElementTracker {
    tracked = [];
    addTracking(trackingData: TrackingData | Array<TrackingData>) {

/*         const apply = obj => {
            const element = document.querySelector(obj.selector);
            // let attached = false;
            // if (element !== null && !attached)
            if (element !== null && !this.tracked.includes(obj.id)) {
                // element.setAttribute("attached", "true"); but this will modify html code on the website
                this.tracked.push(obj.id);
                element.addEventListener("click", () => {
                    MyTracker.track(obj.id);
                });
            }
        }

        if (Array.isArray(trackingData)) {
            trackingData.forEach(apply);
        } else {
            apply(trackingData);
        } */


        if (!Array.isArray(trackingData)) {
            trackingData = [trackingData]; // put the object into an array
        }

        trackingData
            .forEach(obj => {
                const element = document.querySelector(obj.selector); // using selector property find HTML element on the website with this selector
                if (element !== null && !this.tracked.includes(obj.id)) {
                    this.tracked.push(obj.id);
                    element.addEventListener("click", () => {
                        MyTracker.track(obj.id);
                    });
                }
            });
    }
}

window.onload = () => {
    // on load
    let trackingData: [
        { name: "ButtonOffer-1", selector: "button.offfer1", id: 11111 },
        { name: "ButtonOffer-1", selector: "button.offfer1", id: 11111 },
        { name: "ButtonOffer-2", selector: "button.offer2", id: 22222 },
        { name: "articleTeaser", selector: "div.articleContainer", id: 33333 },
        { selector: "a", id: 44444 }
    ];

    const tracker = new ElementTracker()
    tracker.addTracking(trackingData);
    tracker.addTracking(trackingData);
};