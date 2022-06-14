const state = {
    heading: "Trending"
}

export function update(value) {
    state.heading = value
}

export function getHeading() {
    return state.heading
}

export default state