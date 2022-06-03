using System;

namespace myProject
{
    class Program
    {
        static void Main(string[] args)
        {
            //Console.WriteLine("Hello World!");

            countPi(100000);
        }

        static void countPi(int n)
        {
            int i = 0;
            int count = 0;
            double pi = 0;
            double x = 0;
            double y = 0;
            Random rnd = new Random();
            while (i < n)
            {
                x = rnd.NextDouble();
                y = rnd.NextDouble();
                if ((x * x) + (y * y) < 1)
                {
                    count++;
                }
                i++;
            }
            pi = 4 * ((double)count / (double)n);
            Console.WriteLine($" pi = {pi} ");
        }
    }
}
