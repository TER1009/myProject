using System;
namespace back.models
{
    public class room
    {
        public Guid id { get; set; }
        public Guid ownerUserid { get; set; }
        public string topic { get; set; }
    }
}