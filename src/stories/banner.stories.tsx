import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from 'react-router-dom';
import AppBanner from "../Banner";

const meta: Meta<typeof AppBanner> = {
    title: "Banner",
    component: AppBanner,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ]
}

export default meta;

type Banner = StoryObj<typeof meta>;

export const Primary: Banner = {
    args: {
        logoSrc: "/src/assets/logo.png",
        name: "Minuteman Meals",
        desc: "Find free food on campus!",
        profileSrc: "/src/assets/profile.png"
    }
}