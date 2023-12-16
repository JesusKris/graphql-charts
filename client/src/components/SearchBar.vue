<template>
    <div class="searchDiv d-flex ">
        <div class="container d-flex flex-column justify-content-end">
            <div class="searchBar d-flex flex-row justify-content-center">
                <Form class="d-flex justify-content-center">
                    <Field class="col spyArea"
                        @input="updateTheVariable($event.target.value)" as="textarea" name="description"
                        placeholder="Spy on user" id="textarea" style="resize: none;" />
                </Form>
                <button type="button" @click="searchUser()" class="spyButton">Spy</button>
            </div>
        </div>
    </div>
</template>


<script>
import { Form, Field } from "vee-validate";
import router from "../router";
export default {

    data() {
        return {
            description: null,
        }
    },

    components: {
        Form,
        Field,
    },

    methods: {
        updateTheVariable(value) {
            this.description = value
        },

        searchUser() {
            if (this.description == null) {
                return
            }
            let regex = /^\s+$/g
            if (this.description.match(regex)) {
                return
            }
            
            let regex2 = /\/+/g
            if (this.description.match(regex2)) {
                return
            }

            const textarea = document.getElementById('textarea');
            router.push({ path: `/${this.description}` })
            this.$emit(`userchanged`,true)
            this.description = null
            textarea.value = null;
        },
    }
}

</script>

<style>
.searchDiv {
    width: 100%;
    height: 47vh;
}

.spyButton {
    margin-left: 8px;
    width: 80px;
    height: 40px;
    border: 0px none;
    background-color: #da0b95c7;
    color: hsl(0deg 0% 4%);
    transition: 0.3s;
    font-weight: 600;
}

.spyButton:hover {
    background-color: hsl(0deg 0% 80%);
    transform: scale(1.07);
    transition: 0.3s;
}

.spyArea {
    height: 40px;
    width: 240px;
    font-size: 20px;
    background-color: hsl(0deg 0% 80%);;
    padding-left: 10px;
}

.spyArea:focus {
    outline: none !important;
    box-shadow: 0 0 3px hsl(0deg 0% 80%);
}
</style>