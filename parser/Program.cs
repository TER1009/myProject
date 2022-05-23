using System.Threading;
using System.Threading.Tasks;
using System.Diagnostics.SymbolStore;
// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");
using AngleSharp;

string url = "https://jut.su/oneepiece/episode-1.html";
var config = Configuration.Default.WithDefaultLoader();
var context = BrowsingContext.New(config);
var doc = await context.OpenAsync(url);
var items = doc.QuerySelector("video").QuerySelectorAll("source");

foreach (var item in items)
{
    foreach (var atr in item.Attributes)
    {
        if(atr.Name == "src") Console.WriteLine(atr.TextContent);
    }
    Console.WriteLine("!");
}