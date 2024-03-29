import axios from "axios";
import { Goal } from "./types";
import { setToken, refreshToken } from "@/lib/strava";

export default class LoginData {
    static loggedIn = false
    static linked = false;
    static accessToken = ''
    static expiresAt = 0
    static username = ''
    static goals: Goal[] = []
    static _id: string = ''
    static refreshToken = ''
    static stayLoggedIn = false

    static Login(accessToken: string, username: string, goals: Goal[], id: string, expiresAt: number, refresh_token: string, stay_logged_in = false) {
        this.loggedIn = true
        this.accessToken = accessToken
        this.username = username
        this.goals = goals
        this._id = id
        this.expiresAt = expiresAt
        this.refreshToken = refresh_token
        this.linked = this.accessToken !== ''
        this.stayLoggedIn = stay_logged_in

        setToken(accessToken)


        if (stay_logged_in) {
            localStorage.setItem("accessToken", this.accessToken)
            localStorage.setItem("username", this.username)
            localStorage.setItem("goals", JSON.stringify(this.goals))
            localStorage.setItem("id", this._id)
            localStorage.setItem("expiresAt", this.expiresAt.toString())
            localStorage.setItem("refreshToken", this.refreshToken)
            localStorage.setItem("linked", this.linked.toString())
            localStorage.setItem("stayLoggedIn", "true")
        }
        else {
            sessionStorage.setItem("accessToken", this.accessToken)
            sessionStorage.setItem("username", this.username)
            sessionStorage.setItem("goals", JSON.stringify(this.goals))
            sessionStorage.setItem("id", this._id)
            sessionStorage.setItem("expiresAt", this.expiresAt.toString())
            sessionStorage.setItem("refreshToken", this.refreshToken)
            sessionStorage.setItem("linked", this.linked.toString())
        }
    }

    static Logout() {
        this.loggedIn = false
        this.accessToken = ''
        this.username = ''
        this.goals = []
        this._id = ''
        this.expiresAt = 0
        this.refreshToken = ''
        this.linked = false

        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("goals")
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("expiresAt")
        sessionStorage.removeItem("refreshToken")
        sessionStorage.removeItem("linked")

        localStorage.removeItem("accessToken")
        localStorage.removeItem("username")
        localStorage.removeItem("goals")
        localStorage.removeItem("id")
        localStorage.removeItem("expiresAt")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("linked")
    }

    static isLoggedIn() {
        return this.loggedIn
    }

    static getAccessToken() {
        return this.accessToken
    }

    static getRefreshToken() {
        return this.refreshToken
    }

    static setAccessToken(token: string) {
        this.accessToken = token
        if (this.stayLoggedIn)
            localStorage.setItem("accessToken", token)
        else
            sessionStorage.setItem("accessToken", token)
        setToken(token)
    }

    static setRefreshToken(token: string) {
        this.refreshToken = token
        if (this.stayLoggedIn)
            localStorage.setItem("refreshToken", token)
        else
            sessionStorage.setItem("refreshToken", token)
    }

    static getUsername() {
        return this.username
    }

    static getGoals() {
        return this.goals
    }
    static getLinked() {
        return this.linked
    }

    static addGoal(goal: Goal) {
        this.goals.push(goal)
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals));
    }

    static async updateGoals(url: string) {
        const { data } = await axios.get(`${url}/api/users`)
        const user = data.data.find((user: any) => user.username === this.username)
        this.goals = user.goals
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals))
    }

    static completeGoal(id: number, url: string) {
        this.goals = this.goals.map((goal) => {
            if (goal.id === id) {
                goal.completed = true
            }
            return goal
        })
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals))
        axios.put(`${url}/api/users`, {
            _id: this._id,
            goals: this.goals
        })
    }

    static deleteGoal(id: number, url: string) {
        this.goals = this.goals.filter((goal) => goal.id !== id)
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals))
        axios.put(`${url}/api/users`, {
            _id: this._id,
            goals: this.goals
        })
    }

    static updateGoal(goal: Goal, url: string) {
        this.goals = this.goals.map((g) => {
            if (g.id === goal.id) {
                return goal
            }
            return g
        })
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals))
        axios.put(`${url}/api/users`, {
            _id: this._id,
            goals: this.goals
        })
    }

    static getUserID() {
        return this._id
    }

   

    static async getStorage() {
        if (this.loggedIn) return

        this.accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || ''
        this.username = localStorage.getItem("username") || sessionStorage.getItem("username") || ''
        this.goals = JSON.parse(sessionStorage.getItem("goals") || '{}')
        this._id = localStorage.getItem("id") || sessionStorage.getItem("id") || ''
        this.expiresAt = Number(localStorage.getItem("expiresAt") || sessionStorage.getItem("expiresAt") || '0')
        this.refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken") || ''
        this.linked = localStorage.getItem("linked") === "true" || sessionStorage.getItem("linked") === "true"

        this.stayLoggedIn = localStorage.getItem("stayLoggedIn") === "true"
        
        console.log(this.accessToken) 
        console.log(this.linked)

        if (this.accessToken) {
            console.log("linked")
            this.linked = true
        }


        if (this.expiresAt && this.refreshToken && this.expiresAt * 1000 < Date.now()) {
            const res = await refreshToken(this.refreshToken)
            this.accessToken = res.access_token
            this.expiresAt = res.expires_at
            this.refreshToken = res.refresh_token
            if (this.stayLoggedIn) {
                localStorage.setItem("accessToken", this.accessToken)
                localStorage.setItem("expiresAt", this.expiresAt.toString())
                localStorage.setItem("refreshToken", this.refreshToken)
            }
            else {
                sessionStorage.setItem("accessToken", this.accessToken)
                sessionStorage.setItem("expiresAt", this.expiresAt.toString())
                sessionStorage.setItem("refreshToken", this.refreshToken)
            }
        }


        setToken(this.accessToken)

        if (this._id || this.username) {
            this.loggedIn = true
        }
    }
}