import { MotionContainer, MotionTag, FadeUp } from "@/components/motions/landing-page/perfectfor-motions";

const tagList = [
  "Quick & healthy dinners",
  "Dietary restrictions",
  "Student/solo meal prep",
  "Using leftovers",
  "Trying new cuisines",
  "Family meals",
  "Last minute guests",
];

export default function PerfectForSection() {
  return (
    <section className="px-6 py-20 bg-muted/80">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <h2 className="mb-8 text-2xl md:text-3xl font-bold">
            Perfect For...
          </h2>
        </FadeUp>

        <MotionContainer className="flex flex-wrap gap-3 justify-center mb-6">
          {tagList.map((text) => (
            <MotionTag
              key={text}
              className="inline-flex px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-base shadow-sm backdrop-blur-md"
            >
              {text}
            </MotionTag>
          ))}
        </MotionContainer>

        <FadeUp viewportAmount={0.85}>
          <p className="text-lg text-muted-foreground opacity-90 mb-2">
            Get creative, save money, impress your friends, and eat well—any night of the week.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
