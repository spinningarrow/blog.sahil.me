let pkgs = import <nixpkgs> {};

in pkgs.stdenv.mkDerivation rec {
  name = "blog.sahil.me";

  buildInputs = with pkgs; [
    jekyll
    jq
  ];
}
