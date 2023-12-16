<template>
    <div class="col container auditBox d-flex flex-column flex-wrap justify-content-space">
        <div class="d-flex flex-row auditBoxH justify-content-center">
            <div class="row align-items-center" style="font-size: 25px">Progress over time (Levels)</div>
        </div>
        <div class="d-flex flex-column auditBoxB overflow-auto">
            <div id="container2" style="width: 100%; height: 100%;"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            progress: [],
            totalXP: 0
        }
    },


    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.path,
            () => {
                this.getProgress(0)
                this.progress = []
                this.totalXP = 0
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },

    methods: {
        async getProgress(offset) {
            let path = this.$route.path
            let person = path.split("/")
            const res = await axios({
                method: "POST",
                url: "https://01.kood.tech/api/graphql-engine/v1/graphql",
                data: {
                    query: `
                           query ($userLogin: String!, $offset: Int!) {
                                progress(
                                    limit: 1
                                    offset: $offset
                                    order_by: {updatedAt: asc}
                                    where: {_and: [{user: {login: {_eq: $userLogin}}, isDone: {_eq: true}, path: {_iregex: "div-01/(?!piscine-js/)"}}, {user: {login: {_eq: $userLogin}}, isDone: {_eq: true}, path: {_iregex: "div-01/(?!piscine-js-2/)"}}]}
                                ) {
                                        objectId
                                        updatedAt      
                                }
                            }
                            `,
                    variables: {
                        userLogin: person[1],
                        offset: offset
                    }
                }
            })

            if (res.data.data.progress.length == 0) {
                this.createGraph()
                return
            }

            const res2 = await axios({
                method: "POST",
                url: "https://01.kood.tech/api/graphql-engine/v1/graphql",
                data: {
                    query: `
                        query ($userLogin: String!, $objectId: Int!) {
                            transaction(
                                where: {user: {login: {_eq: $userLogin}}, objectId: {_eq: $objectId}, type: {_eq: "xp"}}
                                order_by: {amount: desc_nulls_last}
                            ) {
                                amount
                                path
                            }
                        }`,
                    variables: {
                        userLogin: person[1],
                        objectId: res.data.data.progress[0].objectId
                    }
                }
            })
            let progress1 = {
                x: this.getTime(res.data.data.progress[0].updatedAt),
                value: this.calculateXP(res2.data.data.transaction[0].amount)
            }

            this.progress.push(progress1)
            this.getProgress(offset + 1)
        },
        createGraph() {
            if (document.querySelector("#container2")) {
                document.querySelector("#container2").innerHTML = '';
            }
            let dataSet = anychart.data.set(this.progress)
            let chart = anychart.line()
            let series = chart.line(dataSet)

            series.normal().stroke("#da0b95c7")
            series.tooltip().background("#39373780")
            chart.background().fill("transparent")

            chart.xScale().mode('continuous');


            chart.container("container2")
            chart.getSeriesAt(0).name("Level")

            chart.draw()
        },
        calculateXP(xp) {
            this.totalXP = this.totalXP + xp
            let res = this.calculateLevel(this.totalXP)
            return res

        },
        getTime(time) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let date = new Date(time)
            return monthNames[date.getMonth()] + " " + date.getFullYear()
        },


        calculateLevel(xp) {
            let level = 0

            while (this.levelNeededXP(++level) < xp) { }

            return level - 1
        },

        levelNeededXP(level) {
            return Math.round(level * (176 + 3 * level * (47 + 11 * level)))
        }

    },

}

</script>