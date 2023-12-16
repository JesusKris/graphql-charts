<script setup>
import SearchBarComp from "../components/SearchBar.vue"
import PageNotFoundComp from "./PageNotFound.vue";
import PeriodsComp from "../components/Periods.vue"
import TransactionsComp from "../components/Transactions.vue"
import ProgressComp from "../components/Progress.vue"
import LeaderboardComp from "../components/Leaderboard.vue"


</script>

<template>
    <SearchBarComp />
    <PageNotFoundComp v-if="checkUser" />
    <div v-else class="container info">
        <!-- USER DETAILS -->
        <div class="row userStart d-flex flex-wrap" style="height: inherit">
            <div class="col container personbox d-flex justify-content-center flex-wrap">
                <div class="d-flex align-items-center name flex-wrap justify-content-center">{{ returnUser }}</div>
            </div>
            <PeriodsComp />
        </div>

        <!-- DONE TRANSCATIONS AND AUDITS -->
        <div class="row userStart d-flex flex-wrap" style="height: inherit">
            <TransactionsComp />
        </div>

        <!-- PROGRESS OVER TIME -->
        <div class="row userStart d-flex flex-wrap" style="height: inherit">
            <ProgressComp/>
        </div>

        <!-- TECHNICAL SKILLS -->
        <div class="row userStart d-flex flex-wrap" style="height: inherit">
            <LeaderboardComp/>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            people: [],
            falseUser: false,
        };
    },


    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.path,
            () => {
                this.getUser()
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },

    methods: {
        async getUser() {
            try {
                let path = this.$route.path
                let person = path.split("/")
                let result = await axios({
                    method: "POST",
                    url: "https://01.kood.tech/api/graphql-engine/v1/graphql",
                    data: {
                        query: `
                                query ($userLogin: String) {
                                    user(where: {login: {_eq: $userLogin}}) {
                                    login
                                    }
                                }
                            `,
                        variables: {
                            userLogin: person[1]
                        }
                    }
                });
                this.people = result.data.data.user
            } catch (error) {
                console.error(error);
            }
        },
    },

    computed: {
        checkUser() {
            if (this.people.length != 0) {
                return false
            }
            return true
        },
        returnUser() {
            if (this.people.length == 0) {
                return ""
            }
            return this.people[0].login
        },


    }
}



</script>

<style>
/* AUDITS */

.auditBoxTab {
    border-bottom: 1px solid rgb(85, 84, 84);
    height: 40px;
    min-height: 40px;
    transition: 0.2s;
    padding: 3px;
    overflow-x: hidden;
}

.auditBoxTab:hover {
    transform: scale(1.01);
    transition: 0.2s;
    background-color: rgb(32, 31, 31);
    overflow-x: hidden;
}

.auditBox {
    min-width: 510px;
    height: 400px;
    background-color: #39373780;
    box-shadow: 0px 0px 25px rgb(8, 7, 7);
    overflow-x: hidden;
}

.auditBox>div {
    color: #cccccc;
    -webkit-text-stroke-color: rgb(0, 0, 0);
    -webkit-text-stroke-width: 0.5px;
    overflow-x: hidden;
}

.auditBoxH {
    min-height: 60px;
    max-height: 60px;
    border-bottom: 1px solid rgb(85, 84, 84);
    overflow-x: hidden;
}

.auditBoxB {
    /* background-color: red; */
    width: 100%;
    height: 315px;
    padding: 5px;
    overflow-x: hidden;
}


/* USER DETAILS */
.userStart>div {
    margin: 30px;
}

.name {
    font-size: 35px;
    color: hsl(0deg 0% 80%);
    min-width: inherit;
}

.personbox {
    min-width: 150px;
    height: 150px;
    background-color: hsla(0, 2%, 22%, 0.5);
    box-shadow: 0px 0px 25px rgb(8, 7, 7);
}

.personbox2 {
    height: 150px;
}

.personbox>div {
    color: hsl(0deg 0% 80%);
}

.info {
    margin-top: 100px;
    width: 100%;
    height: inherit;
    -webkit-text-stroke-color: rgb(0, 0, 0);
    -webkit-text-stroke-width: 0.5px;
}
</style>