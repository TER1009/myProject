using System;

namespace back.DTO
{
    public class roomDTO
    {
        public Guid id { get; set; }
        public Guid ownerUserid { get; set; }
        public string topic { get; set; }
    }

    public class roomView
    {
        public string topic { get; set; }
    }
}