using System;
namespace back.models
{
    public class places : contentpages
    {
        public Guid placesId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }
}