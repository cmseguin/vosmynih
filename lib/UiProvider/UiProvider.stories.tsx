import { Theme } from "../Theme/Theme";
import { UiProvider } from "../UiProvider/UiProvider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/UiProvider",
  component: UiProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UiProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Inner = () => {
  return (
    <div
      style={{
        padding: "5rem",
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >
      Inner Text
    </div>
  );
};

export const Primary: Story = {
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
    defaultThemeKey: {
      control: "select",
      options: ["light", "dark"],
    },
    themes: {
      control: {
        disable: true,
      },
    },
    themeStorageKey: {
      control: {
        disable: true,
      },
    },
  },
  args: {
    children: <Inner />,
    defaultThemeKey: "dark",
    themes: [
      new Theme("light", { "color-background": "#fff", "color-text": "#000" }),
      new Theme("dark", { "color-background": "#000", "color-text": "#fff" }),
    ],
  },
};
