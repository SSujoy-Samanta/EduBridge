export const Testimonial = () => {
  return (
    <>
      <div className="w-full lg:w-1/3 p-6 dark:bg-pink-900 dark:bg-opacity-30 text-white rounded-lg shadow-lg mb-6 lg:mb-0">
        <p className="italic">
          &quot;EduBridge connected me with an alumni mentor who guided me through my
          career journey.;
        </p>
        <h4 className="mt-4 font-semibold text-lg text-black">
          - John, Software Engineer
        </h4>
      </div>
      {/* Testimonial 2 */}
      <div className="w-full lg:w-1/3 p-6 dark:bg-pink-900 dark:bg-opacity-30 bg-white rounded-lg shadow-lg text-white">
        <p className="italic">
          &quot;I found incredible support and networking opportunities with alumni
            via EduBridge.;
        </p>
        <h4 className="mt-4 font-semibold text-lg text-black">
          - Sarah, Marketing Specialist
        </h4>
      </div>
    </>
  );
};
