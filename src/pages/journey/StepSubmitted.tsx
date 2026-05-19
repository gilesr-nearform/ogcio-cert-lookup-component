type Props = {
  onHome: () => void;
};

const MONO_STACK =
  '"IBM Plex Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

export function StepSubmitted({ onHome }: Props) {
  return (
    <div
      className="min-h-screen w-full bg-[#181818] text-white flex items-center px-2xl"
      style={{ fontFamily: MONO_STACK }}
    >
      <div className="flex flex-col gap-2xl max-w-[544px] mx-auto">
        <div className="flex flex-col gap-lg">
          <p className="text-2xl font-bold leading-snug">
            PaymentsIE would handle this step
          </p>
          <p className="text-2xl leading-snug">
            The citizen is handed to PaymentsIE for the transaction.
          </p>
        </div>
        <button
          type="button"
          onClick={onHome}
          className="self-start text-base underline underline-offset-4 cursor-pointer hover:text-gray-300"
          style={{ fontFamily: MONO_STACK }}
        >
          Return to prototype home
        </button>
      </div>
    </div>
  );
}
