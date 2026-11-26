import "./styles.css";
import { Fit, Rive, Layout, type ViewModelInstance } from "@rive-app/webgl2";

type ButtonTrigger = { buttonId: string; trigger: string };

function createScreen(
  canvasId: string,
  file: string,
  artboard: string,
  buttons: ButtonTrigger[]
): Rive {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  const r = new Rive({
    src: file,
    canvas,
    artboard,
    stateMachines: "State Machine 1",
    layout: new Layout({ fit: Fit.Contain }),
    autoplay: true,
    autoBind: true,
    onLoad: (): void => {
      r.resizeDrawingSurfaceToCanvas();
      if (buttons.length === 0) return;

      const vmi = r.viewModelInstance as ViewModelInstance | null;
      if (!vmi) {
        console.error(`ViewModel instance not available for ${artboard}`);
        return;
      }

      for (const { buttonId, trigger } of buttons) {
        const button = document.getElementById(buttonId) as HTMLButtonElement;
        button.addEventListener("click", () => {
          vmi.trigger(trigger)?.trigger();
          console.log(`${trigger} fired`);
        });
      }
    },
    onLoadError: (error): void => {
      console.error(`Failed to load ${artboard}:`, error);
    },
  });

  return r;
}

const screens = [
  createScreen(
    "canvas-openbag",
    new URL("./cat_openbag.riv", import.meta.url).href,
    "openbag",
    [{ buttonId: "btn-openbag", trigger: "openbag" }]
  ),
  createScreen(
    "canvas-side",
    new URL("./cat_side.riv", import.meta.url).href,
    "side",
    [
      { buttonId: "btn-in-side", trigger: "inCatSide" },
      { buttonId: "btn-out-side", trigger: "outCatSide" },
    ]
  ),
  createScreen(
    "canvas-writing",
    new URL("./cat_writing.riv", import.meta.url).href,
    "writing",
    [
      { buttonId: "btn-write", trigger: "write" },
      { buttonId: "btn-lookup", trigger: "lookup" },
      { buttonId: "btn-happy", trigger: "happyatuser" },
    ]
  ),
  createScreen(
    "canvas-reading",
    new URL("./cat_reading.riv", import.meta.url).href,
    "reading",
    []
  ),
  createScreen(
    "canvas-box",
    new URL("./cat_box.riv", import.meta.url).href,
    "box",
    [{ buttonId: "btn-open-box", trigger: "openBox" }]
  ),
  createScreen(
    "canvas-standing",
    new URL("./cat_standing.riv", import.meta.url).href,
    "standing",
    []
  ),
];

window.addEventListener("resize", () => {
  for (const r of screens) r.resizeDrawingSurfaceToCanvas();
});
