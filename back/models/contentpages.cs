using System.Net.Mime;
using System;
using Microsoft.AspNetCore.Http;
using System.Drawing;

namespace back.models
{
    public class contentpages
    {
        public Guid id { get; set; }
        public string typeContent { get; set; }
        public Guid ownerId { get; set; }
        public Guid lastEditor { get; set; }
        public string description { get; set; }
        public byte[] pic { get; set; }
        public string typePic { get; set; }
        public string name { get; set; }
    }
}