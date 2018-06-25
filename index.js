window.addEventListener('DOMContentLoaded', main);

function main() {
    let model = createModel(),
        actions = createActions(model),
        view = createView();

    m.mount(document.body, view(model, actions));
}

function createModel() {
    return {
        RPorigins: [
            {
                origin: "1120 Broadway Brooklyng, NY, 11221",
                date: "Wednesday May 5, 2018",
                views: 126,
                departures: [
                    {
                        outbound: {
                            depart: "9:30a",
                            arrive: "12:30p"
                        },
                        return: {
                            depart: "19:30p",
                            arrive: "1:30a"
                        },
                        costPerSeat: "$65",
                        priceFluctuation: {
                            rise: {
                                price: "$80",
                                days: "3 days"
                            },
                            fall: {
                                price: "",
                                days: ""
                            }
                        }
                    },
                    {
                        outbound: {
                            depart: "10:30a",
                            arrive: "13:30p"
                        },
                        return: {
                            depart: "20:30p",
                            arrive: "2:30a"
                        },
                        costPerSeat: "$65",
                        priceFluctuation: {
                            rise: {
                                price: "$80",
                                days: "3 days"
                            },
                            fall: {
                                price: "",
                                days: ""
                            }
                        }
                    }
                ],

            },
            {
                origin: "80 Military Lane. Bronx, NY 10468",
                date: "Thursday May 6, 2018",
                views: 226,
                departures: [
                    {
                        outbound: {
                            depart: "8:30a",
                            arrive: "11:30p"
                        },
                        return: {
                            depart: "18:30p",
                            arrive: "2:30a"
                        },
                        priceFluctuation: {
                            rise: {
                                price: "$90",
                                days: "2 days"
                            },
                            fall: {
                                price: "",
                                days: ""
                            }
                        },
                        costPerSeat: "$85",
                    },
                    {
                        outbound: {
                            depart: "11:30a",
                            arrive: "14:30p"
                        },
                        return: {
                            depart: "21:30p",
                            arrive: "2:30a"
                        },
                        priceFluctuation: {
                            rise: {
                                price: "$100",
                                days: "9 days"
                            },
                            fall: {
                                price: "",
                                days: ""
                            }
                        },
                        costPerSeat: "$55",
                    }
                ],

            },
        ],
        selectedOriginPnt: {
            origin: "1120 Broadway Brooklyng, NY, 11221",
            date: "Wednesday May 5, 2018",
            views: 126,
            departures: [
                {
                    outbound: {
                        depart: "9:30a",
                        arrive: "12:30p"
                    },
                    return: {
                        depart: "19:30p",
                        arrive: "1:30a"
                    },
                    costPerSeat: "$65",
                    priceFluctuation: {
                        rise: {
                            price: "$80",
                            days: "3 days"
                        },
                        fall: {
                            price: "",
                            days: ""
                        }
                    }
                },
                {
                    outbound: {
                        depart: "10:30a",
                        arrive: "13:30p"
                    },
                    return: {
                        depart: "20:30p",
                        arrive: "2:30a"
                    },
                    costPerSeat: "$65",
                    priceFluctuation: {
                        rise: {
                            price: "$80",
                            days: "3 days"
                        },
                        fall: {
                            price: "",
                            days: ""
                        }
                    }
                }
            ],
        },
        numberOfSeatSelected: 0
    }
}

function createActions(model) {
    return {
        updateRPoriginsDetails
    }

    function updateRPoriginsDetails(originPoint) {
        model.selectedOriginPnt = model.RPorigins.filter((data) => {
            if (originPoint == data.date) {
                return data;
            }
        })[0];
    }
}

function createView() {
    return vwApp;

    function vwApp(model, actions) {
        return {
            view: (vnode) => vwBody(model, actions)
        }
    }

    function vwBody(model, actions) {
        return m(".vwBody",
            m(".row",
                m(".col-sm-4",
                    "Select Origin : ", m("select.input", {
                        onchange: m.withAttr('value', (value) => actions.updateRPoriginsDetails(value))
                    },
                        model.RPorigins.map(o => {
                            return m('option', {
                                value: o.date
                            }, o.origin)
                        })
                    ),
                ),
            ),
            m(".row",
                m(".col-sm-3",
                    m("div",
                        m('h5', 'Select your time :'),
                    )
                )
            ),
            m(".row",
                m(".col-sm-3",
                    m("div",
                        m('h5', `${model.selectedOriginPnt.departures.length} results for`),
                    ),
                    m("div",
                        m('h5', `${model.selectedOriginPnt.date} `, m("span.glyphicon.glyphicon-eye-open", ` ${model.selectedOriginPnt.views}`)),
                    )
                )
            ),
            m(".row",
                model.selectedOriginPnt.departures.map((data, index) => m('.row.well', [
                    m(".col-sm-4",
                        [
                            m("u", `Departure #${index + 1}`),
                            m("div",
                                "Outbound"
                            ),
                            m(".row",
                                [
                                    m(".col-sm-6",
                                        "Depart"
                                    ),
                                    m(".col-sm-6",
                                        "Arrive"
                                    )
                                ]
                            ),
                            m(".row",
                                [
                                    m(".col-sm-6",
                                        m("u", data.outbound.depart)
                                    ),
                                    m(".col-sm-6",
                                        m("u", data.outbound.arrive)
                                    )
                                ]
                            )
                        ]
                    ),
                    m(".col-sm-4",
                        [
                            m("b",
                                data.costPerSeat
                            ),
                            " per seat",
                            m("div",
                                ` price will rise to ${data.priceFluctuation.rise.price} in ${data.priceFluctuation.rise.days}`
                            ),
                            m("div",
                                m("span.label.label-primary",
                                    "beta"
                                )
                            )
                        ]
                    ),
                    m(".col-sm-4",
                    vwGraph(model, actions)
                    )
                ]))
            )
        )
    }
    function vwGraph(model, actions) {
        
        return m('', {
               // oncreate: () => createGraph(model),
            },
            m(".row",
                m(".col-sm-12",
                    m(".graph-view",
                    m("canvas[height='100'][id='donut'][width='100']"),
                    )
                )
            )
        )
    }
    // function createGraph(model) {
    //     var donutEl = document.getElementById("donut").getContext("2d");
    //     var donut = new Chart(donutEl).Doughnut(
    //         // Datas
    //         [
    //             {
    //                 value: 20,
    //                 color:"#ffffff",
    //                 highlight: "#FF5A5E",
    //                 label: "Red"
    //             },
    //             {
    //                 value: 60,
    //                 color: "#F9F3F2",
    //                 highlight: "#5AD3D1",
    //                 label: "Green"
    //             },
    //             {
    //                 value: 100,
    //                 color: "#FFC300",
    //                 highlight: "#FFC870",
    //                 label: "Yellow"
    //             },
    //             {
    //                 value: 10,
    //                 color:"#ffffff",
    //                 highlight: "#FF5A5E",
    //                 label: "Red"
    //             },
    //             {
    //                 value: 120,
    //                 color: "#CED1F3",
    //                 highlight: "#5AD3D1",
    //                 label: "Green"
    //             },
    //             {
    //                 value: 10,
    //                 color:"#ffffff",
    //                 highlight: "#FF5A5E",
    //                 label: "Red"
    //             },
    //             {
    //                 value: 100,
    //                 color: "#F9A59D",
    //                 highlight: "#FFC870",
    //                 label: "Yellow"
    //             }
    //         ],
    //         // Options
    //         {
    //             segmentShowStroke : true,
    //             segmentStrokeColor : "#fff",
    //             segmentStrokeWidth : 2,
    //             percentageInnerCutout : 50,
    //             animationSteps : 100,
    //             animationEasing : "easeOutBounce",
    //             animateRotate : true,
    //             animateScale : false,
    //             responsive: true,
    //             maintainAspectRatio: true,
    //             showScale: true,
    //             animateScale: true
    //         });

    // }
}