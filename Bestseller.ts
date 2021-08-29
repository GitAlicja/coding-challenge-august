class Bestseller {

    public static getBestsellerHeadlines(numberOfHeadlines: number): Promise<Array<string>> { // Array<string>

        return new Promise((resolve, reject) => {
            const runWithRetry = (isRetry: boolean) => {
                this.getBestsellerIds().then((result: Array<{ articleId: number; sales: number; }>) => {

                    const arrayOfIds = result
                        // 1. order descending by sales
                        .sort((a, b) => { return b.sales - a.sales })
                        // 2. remove duplicates
                        .filter((value, index, array) => array.map(obj => obj.articleId).indexOf(value.articleId) === index)
                        // 3. take only n first entries (defined by numberOfHeadlines)
                        .slice(0, numberOfHeadlines)
                        // 4. get an array with articles ids only
                        .map(item => item.articleId);

                    // for each id request headline and wait for all results
                    Promise.all(arrayOfIds.map(headlineId => this.getHeadline(headlineId)))
                        .then(values => resolve(values))
                        .catch(error => reject(error));

                }).catch(error => {
                    if (isRetry) {
                        console.info("Retrying...");
                        runWithRetry(false);
                    } else {
                        reject(error);
                    }
                });
            };

            runWithRetry(true);
        });
    }

    //---------------------------- API mock (please don't change) ------------------------------

    public static getBestsellerIds(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.getRandomInt(10) > 8) {
                    reject("API failed to respond");
                } else {
                    resolve([
                        { articleId: 1111, sales: 872 },
                        { articleId: 2222, sales: 101 },
                        { articleId: 3333, sales: 342 },
                        { articleId: 4444, sales: 872 },
                        { articleId: 5555, sales: 342 },
                        { articleId: 6666, sales: 234 },
                        { articleId: 1111, sales: 872 },
                        { articleId: 2222, sales: 101 }
                    ]);
                }
            }, 1000);
        });
    }

    public static getHeadline(articleId: number): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (articleId) {
                    case 1111:
                        resolve("headline 1");
                    case 2222:
                        resolve("headline 2");
                    case 3333:
                        resolve("headline 3");
                    case 4444:
                        resolve("headline 4");
                    case 5555:
                        resolve("headline 5");
                    case 6666:
                        resolve("headline 6");
                    default:
                        reject("invalid articleId");
                }
            });
        });
    }

    public static getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

}

Bestseller.getBestsellerHeadlines(3).then(r => console.log(r)).catch(e => console.error(e));