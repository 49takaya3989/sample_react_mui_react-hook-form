import '@testing-library/jest-dom';
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// テストの副作用を防ぎ、各テストが互いに独立して実行するために clean up する
afterEach(() => {
  cleanup();
});
