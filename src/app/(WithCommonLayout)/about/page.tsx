"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Linkedin } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Introduction */}
      <section>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 via-teal-500 to-purple-600 text-transparent bg-clip-text">
          About AdolBodol
        </h1>
        <Separator className="my-4" />
        <Card className="bg-muted/30 shadow hover:shadow-lg transition-all">
          <CardContent className="p-6 text-lg leading-relaxed">
            <p>
              Welcome to <span className=" font-bold">AdolBodol</span> — your
              modern marketplace to buy and sell gadgets with confidence. We
              bridge the gap between innovation and affordability.
            </p>
            <p className="italic mt-4 text-sm text-right">
              “Empowering smarter tech trades for everyone.”
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 2. Our Story */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold ">Our Story</h2>
          <Separator />
          <Card className="bg-muted/20 shadow hover:shadow-lg transition-all">
            <CardContent className="p-6 space-y-4 text-base text-muted-foreground">
              <p>
                GadgetHub was founded in 2024 by a small group of passionate
                developers and tech lovers who were tired of risky and
                inefficient second-hand gadget markets.
              </p>
              <p>
                We built a platform centered on security, ease, and
                eco-consciousness. With 1,000+ successful trades and a
                fast-growing user base, we’re just getting started.
              </p>
            </CardContent>
          </Card>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Our Story"
          width={500}
          height={500}
          className="w-full h-auto rounded-xl shadow-xl object-cover"
        />
      </section>

      {/* 3. Mission, Vision, Values */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Mission • Vision • Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 space-y-2">
              <h3 className="font-semibold">Mission</h3>
              <p className="">
                Make gadget exchange fast, secure, and accessible for everyone.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 space-y-2">
              <h3 className="font-semibold">Vision</h3>
              <p className="text-muted-foreground">
                A future where used tech flows freely, efficiently, and
                ethically.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 space-y-2">
              <h3 className="font-semibold">Core Values</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Transparency</li>
                <li>Trust & Safety</li>
                <li>Tech for All</li>
                <li>Sustainability</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Team Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
        <div className="flex flex-row items-center justify-center flex-wrap gap-6">
          <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 ring-2 ring-primary">
                <AvatarImage src="https://images.unsplash.com/photo-1657727534676-cac1bb160d64?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <AvatarFallback>MI</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Mahmudul Islam</h4>
                <p className="text-sm text-muted-foreground">
                  Founder & Lead Developer
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Linkedin />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 ring-2 ring-primary">
                <AvatarImage src="https://plus.unsplash.com/premium_photo-1661432963180-11f554ff1ced?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <AvatarFallback>MI</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Sujon Ahmed</h4>
                <p className="text-sm text-muted-foreground">
                  Founder & Lead Developer
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Linkedin />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 ring-2 ring-primary">
                <AvatarImage src="https://images.unsplash.com/photo-1625502664816-4938b1d0d685?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <AvatarFallback>MI</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Mazharul Islam</h4>
                <p className="text-sm text-muted-foreground">
                  Founder & Lead Developer
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Linkedin />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 ring-2 ring-primary">
                <AvatarImage src="https://images.unsplash.com/photo-1695512236733-fe3ea1375519?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <AvatarFallback>MI</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Rasel Ahmed</h4>
                <p className="text-sm text-muted-foreground">
                  Founder & Lead Developer
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Linkedin />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 ring-2 ring-primary">
                <AvatarImage src="https://images.unsplash.com/photo-1619950463968-f2bfb9341d00?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <AvatarFallback>MI</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Sumon Ahmed</h4>
                <p className="text-sm text-muted-foreground">
                  Founder & Lead Developer
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Linkedin />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
