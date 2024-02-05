import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "./TextInput";
import { UiProvider } from "../UiProvider/UiProvider";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <UiProvider>
        <Story />
      </UiProvider>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "filled",
    appearance: "primary",
    size: "md",
  },
};
