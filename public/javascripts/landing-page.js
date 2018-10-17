Vue.options.delimiters = ['{[{', '}]}'];

new Vue({
    el: "#landing-page",
    data: {
        value: '',
        sign_up: {
            first_name: "",
            last_name: "",
            email: "",
            password1: "",
            password2: "",
            error: []
        }
    },
    methods: {
        userSignUpModal(){
            this.sign_up.error = []
            this.sign_up.first_name = ""
            this.sign_up.last_name = ""
            this.sign_up.email = ""
            this.sign_up.password1 = ""
            this.sign_up.password2 = ""
        },
        userSignUp(e){
            e.preventDefault()
            console.log('mmmmmm')
            this.sign_up.error =[]
            if (!this.sign_up.password1) {
                return this.sign_up.error.push('password field is required')
            }
            if (this.sign_up.password1 !== this.sign_up.password2) {
                return this.sign_up.error.push('password does not match')
            }
            window.location = 'http://localhost:3000/account/signup'
        }
    }
})

