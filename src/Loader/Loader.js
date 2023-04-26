import { TailSpin } from 'react-loader-spinner';
export function Loader() {
  return (
    <TailSpin
      height="120"
      width="120"
      color="#3f51b5"
      ariaLabel="tail-spin-loading"
      wrapperStyle={{ justifyContent: 'center' }}
      radius="1"
      wrapperClass=""
      visible={true}
    />
  );
}
