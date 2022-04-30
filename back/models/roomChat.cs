using System;
namespace back.models
{
    public class room
    {
        public Guid id { get; set; }
        public string topic { get; set; }
        public string owner { get; set; }
        public Guid ownerId { get; set; }

    }
}