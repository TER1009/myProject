using System.Net.Mime;
using System;
using Microsoft.AspNetCore.Http;

namespace back.models
{
    public class contentpages
    {
        public Guid id { get; set; }
        public string typeContent { get; set; }
        public Guid ownerClientId { get; set; }
        public Guid lastEditor { get; set; }
        public string description { get; set; }
        //public IFormFile picture { get; set; }
    }
}