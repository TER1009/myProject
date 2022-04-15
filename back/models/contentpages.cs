using System;
namespace back.models
{
    public class contentpages
    {
        public Guid id { get; set; }
        public string typeContent { get; set; }
        public Guid ownerClientId { get; set; }
        public Guid lastEditor { get; set; }
    }
}