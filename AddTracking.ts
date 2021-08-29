// tracker mock
class MyTracker {
    // Tracks a single click event
    static track(track_id: number): void {
        // example implementation
        console.log("Event was tracked for" + track_id);
    }
}
// meta information for an element to track
interface TrackingData {
    name?: string;
    selector: string;
    id: number;
}

class ElementTracker {

    // remembers the ids of the elements which are already tracked
    tracked: Array<number> = [];

    addTracking(trackingData: TrackingData | Array<TrackingData>): boolean {
        // ensure that trackingData is an array
        if (!Array.isArray(trackingData)) {
            trackingData = [trackingData];
        }

        const elementsFound = trackingData
            .map(obj => {
                // using selector property find HTML element on the website with this CSS selector
                const element = document.querySelector(obj.selector);
                // add event listner once if the element was found
                if (element !== null && !this.tracked.includes(obj.id)) {
                    this.tracked.push(obj.id);
                    element.addEventListener("click", () => {
                        MyTracker.track(obj.id);

                        const developer = localStorage.getItem("developer-mode");
                        if (developer === "true") {
                            console.log(`Element with ${obj.name ? "name " + obj.name + " and " : ""}tracking id ${obj.id} was clicked!`)
                        }
                    });
                }
                return !!element;
            });

        for (const elemFound of elementsFound) {
            if (!elemFound) {
                return false;
            }
        }
        return true;
    }
}

// example usage
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