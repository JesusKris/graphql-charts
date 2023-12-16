<template>
    <div class="col container  personbox  d-flex justify-content-center flex-wrap" @userChanged="getXP(0)">
        <div class="col d-flex flex-column">
            <div class="col d-flex flex-column justify-content center align-items-center"
                style="margin-top: 15px;font-size: 20px; min-width: 150px;">Div 01 </div>
            <div class="col d-flex flex-column justify-content center align-items-center"
                style="font-size: 30px; margin-top: -20px; margin-top: -20px; min-width: 150px; color: rgba(218, 11, 149, 0.78);">
                {{ showLEVEL }}</div>
            <div class="col d-flex flex-column justify-content center align-items-center"
                style="font-size: 13px; margin-bottom: -25px; min-width: 150px;">{{ showXP }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            totalXP: 0
        };
    },

    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.path,
            () => {
                 this.getXP(0)
                 this.totalXP = 0
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },

    methods: {
        async getXP(offset) {
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
                                    where: {_and: [{user: {login: {_eq: $userLogin}}, isDone: {_eq: true}, path: {_regex: "div-01/(?!piscine-js/)"}}, {user: {login: {_eq: $userLogin}}, isDone: {_eq: true}, path: {_regex: "div-01/(?!piscine-js-2/)"}}]}
                                ) {
                                    objectId       
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
            this.totalXP = this.totalXP + res2.data.data.transaction[0].amount
            this.getXP(offset + 1)
        }
    },

    computed: {
        showXP() {
            if (this.totalXP == 0) {
                return 0
            }
            if (this.totalXP < 1000000) {
                return `${(this.totalXP / 1000).toFixed(0)}kB`
            }

            if (this.totalXP > 1000000) {
                return `${(this.totalXP / 1000000).toFixed(0)}MB`
            }
        },
        showLEVEL() {
            function calculateLevel(xp) {
                let level = 0

                while (levelNeededXP(++level) < xp) { }

                return level - 1
            }

            return calculateLevel(this.totalXP)
            function levelNeededXP(level) {
                return Math.round(level * (176 + 3 * level * (47 + 11 * level)))
            }
        }
    }

}

</script>