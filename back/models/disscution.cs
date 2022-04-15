using System;
namespace back.models
{
    public class disscution
    {
        public Guid id { get; set; }
        public Guid ownerUserid { get; set; }
        public string topic { get; set; }
        public string description { get; set; }
        public string tags { get; set; }
    }
}