from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from typing import Optional
# NORMAL IMPORTS
import argparse
from typing import NamedTuple
import json
import pathlib
import os.path


def debug(msg: str, debug_flag=False):
    if debug_flag:
        print(msg)

class read_config:

    def __enter__(self, *args, **kwargs):
        path = os.path.join(os.path.curdir, 'tsconfig.json')
        with open(path) as f:
            data = json.loads('\n'.join(f.readlines()))
            dat2 = data['compilerOptions']
            return Config(paths=dat2['paths'])
    def __exit__(self, *args, **kwargs):
        return


class Config(NamedTuple):
    paths: dict[str, str]

class Main:
    def run(self) -> int:
        parser = argparse.ArgumentParser()

        parser.add_argument('--debug')


        args = parser.parse_args()
        paths: Optional[dict[str, str]] = None

        with read_config() as config:
            paths = config.paths

        if not paths:
            return 0
        dist_path = os.path.join(
            os.path.abspath(os.path.curdir), 'dist'
        )

        debug(dist_path)
        constructedPath = pathlib.Path(dist_path)
        debug(constructedPath)
        for a in constructedPath.rglob(pattern='*'):
            if a.is_file():
                content = a.read_text('utf-8')
                new_content = ''
                for key in paths.keys():
                    debug(f'{key=}')
                    path = os.path.join(os.path.abspath(os.path.curdir), 'dist', paths[key][0].replace('*', ''))
                    new_content = content.replace(key.replace('*', ''), path)
                debug(f'{new_content}')
                a.write_text(new_content)
                debug(f'updated {a.name}.')


def main() -> int:

    main = Main()

    return main.run()

if __name__ == '__main__':
    raise SystemExit(main())
