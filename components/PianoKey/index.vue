<template>
    <PianoKeyComponent class="piano-key" @mousedown="toggleClass($event, true)" @mouseup="toggleClass($event, false)">
        <slot></slot>
    </PianoKeyComponent>
</template>

<script>
import styled from "vue-styled-components";
import { mapState } from "vuex";

const PianoKeyComponent = styled.div`
    &.pressed {
        background-color: #FF760C;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.8);
        transform: scale(0.99) translateY(-3px);
    }
    > div.black {
        position: absolute;
        right: -14px;
        width: 28px;
        height: 123px;
        background-color: #000;
    }
`;

export default {
    components: {
        PianoKeyComponent
    },
    data() {
        return {
            isPressed: false
        }
    },
    computed: mapState(['currentKey']),
    methods: {
        toggleClass(event, isClicked) {

            const currentKey = event.target;

            const piano = currentKey.closest(".piano");

            piano.querySelectorAll(".piano-key").forEach(element => {

                if (element.classList.contains("pressed")) {
                    element.classList.remove("pressed");
                }

            });

            if (isClicked) {
                currentKey.classList.add("pressed");
            } else {
                currentKey.classList.remove("pressed");
            }

        }
    }
}
</script>