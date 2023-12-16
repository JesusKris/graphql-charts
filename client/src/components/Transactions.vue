<template>
    <div class="col container auditBox d-flex flex-column flex-wrap justify-content-space">
        <div class="d-flex flex-row auditBoxH justify-content-center">
            <div class="row align-items-center" style="font-size: 25px">Last activity</div>
        </div>
        <div class="d-flex flex-column auditBoxB ">
            <div v-for="transaction in transactions">
                <div class="auditBoxTab d-flex flex-row align-items-center">
                    <div class="col-4 unselectable">{{ transaction.path }}</div>
                    <div class="col-5 justify-content-center d-flex unselectable">{{ getXp(transaction.xp) }}</div>
                    <div class="col-3 justify-content-center d-flex unselectable">{{ getTime(transaction.createdAt) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            transactions: []
        };
    },

    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.path,
            () => {
                this.getTransaction(0)
                this.transactions = []
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },

    methods: {
        async getTransaction(offset) {
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
                                        object {
                                            name
                                        }
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
                this.transactions.reverse()
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
            let transaction = {
                path: res.data.data.progress[0].object.name,
                createdAt: res.data.data.progress[0].updatedAt,
                xp: res2.data.data.transaction[0].amount
            }

            this.transactions.push(transaction)
            this.getTransaction(offset + 1)
        },
        getTime(time) {
            return new Date(time).toLocaleString()
        },
        getXp(xp) {
            if (xp < 1000) {
                return `${xp}B`
            }
            if (xp > 1000 && xp < 1000000) {
                return `${(xp / 1000).toFixed(0)}kB`
            }
        },
    },
}

</script>