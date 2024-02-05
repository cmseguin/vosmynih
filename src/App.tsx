import { Button } from "../lib/Button";
import { UiProvider } from "../lib/UiProvider/UiProvider";

function App() {
  return (
    <UiProvider>
      <Button>Test</Button>
    </UiProvider>
  );
}

export default App;
