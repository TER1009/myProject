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
var attrs = doc.QuerySelectorAll("video")[0].Attributes;

foreach (var attr in attrs)
{
    Console.WriteLine(attr.Name);
}