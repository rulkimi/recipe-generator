export default function PerfectForSection() {
  return (
    <section className="px-6 py-20 bg-muted/80">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-8 text-2xl md:text-3xl font-bold">Perfect For...</h2>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {[
            "Quick & healthy dinners",
            "Dietary restrictions",
            "Student/solo meal prep",
            "Using leftovers",
            "Trying new cuisines",
            "Family meals",
            "Last minute guests",
          ].map((text) => (
            <span
              key={text}
              className="inline-flex px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-base shadow-sm backdrop-blur-md"
            >
              {text}
            </span>
          ))}
        </div>
        <p className="text-lg text-muted-foreground opacity-90 mb-2">
          Get creative, save money, impress your friends, and eat well—any night of the week.
        </p>
      </div>
    </section>
  )
}