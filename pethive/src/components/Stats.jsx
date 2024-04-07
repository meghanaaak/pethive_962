import "../styles/Stats.css";

const Stats = () => {
  return (
    <div className="container flex flex-col mx-auto">
      <div className="w-full draggable">
        <div className="container flex flex-col items-center gap-16 mx-auto my-10">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-y-8">
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-accent-content">
                <span>2+</span> Years
              </h3>
              <p className="text-base font-medium leading-7 text-center text-dark-grey-600">
                Connecting Pets with Loving Homes
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-accent-content">
                200+
              </h3>
              <p className="text-base font-medium leading-7 text-center text-accent-content">
                Successful Adoptions Facilitated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
