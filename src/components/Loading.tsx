type LoadingProps = {
  message?: string;
};

function Loading(props: LoadingProps) {
  const { message } = props;

  return (
    <div
      className="loading"
      aria-busy="true"
      aria-live="polite"
      role="progressbar"
      aria-labelledby="loading__message"
    >
      <div className="loading__spinner" aria-hidden="true">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <span className="loading__message" id="loading__message">
        {message ? message : 'Loading'}...
      </span>
    </div>
  );
}
export default Loading;
